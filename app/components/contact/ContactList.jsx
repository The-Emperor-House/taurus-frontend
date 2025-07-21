"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";

export default function ContactListWithDetailModal() {
  const { data: session, status } = useSession();
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    let isMounted = true;

    const fetchContacts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          headers: { Authorization: `Bearer ${session.backendToken}` },
        });
        if (!res.ok) throw new Error("โหลดข้อมูลไม่สำเร็จ");
        const data = await res.json();
        if (isMounted) {
          const formatted = data.map((c) => ({
            id: c.id,
            fullName: c.fullName,
            email: c.email,
            phone: c.phone,
            budget: c.budget,
            areaSize: c.areaSize,
            needs: c.needs.join(", "),
            details: c.details || "-",
            createdAt: new Date(c.createdAt).toLocaleString("th-TH"),
          }));
          setContacts(formatted);
          setFiltered(formatted);
        }
      } catch (err) {
        if (isMounted) setError(err.message || "เกิดข้อผิดพลาด");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchContacts();
    return () => {
      isMounted = false;
    };
  }, [session, status]);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      contacts.filter(
        (c) =>
          c.fullName.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.phone.includes(term) ||
          c.needs.toLowerCase().includes(term)
      )
    );
  }, [search, contacts]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "contacts.xlsx");
  };

  const columns = [
    { field: "fullName", headerName: "ชื่อ", flex: 1, minWidth: 150 },
    { field: "email", headerName: "อีเมล", flex: 1, minWidth: 180 },
    { field: "phone", headerName: "เบอร์", flex: 1, minWidth: 120 },
    { field: "needs", headerName: "บริการ", flex: 1, minWidth: 180 },
    { field: "createdAt", headerName: "วันที่", flex: 1, minWidth: 150 },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          my: 4,
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          📋 รายการ Contact ทั้งหมด
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
          <TextField
            label="ค้นหา"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
          />
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={exportToExcel}
            disabled={filtered.length === 0}
          >
            Export Excel
          </Button>
        </Box>

        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box sx={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={filtered}
              columns={columns}
              loading={loading}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              pagination
              disableSelectionOnClick
              onRowClick={(params) => setSelectedContact(params.row)}
            />
          </Box>
        )}

        {/* ✅ Detail Modal */}
        <Dialog
          open={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>รายละเอียด Contact</DialogTitle>
          <DialogContent dividers>
            {selectedContact && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography>
                  <strong>ชื่อ:</strong> {selectedContact.fullName}
                </Typography>
                <Typography>
                  <strong>อีเมล:</strong> {selectedContact.email}
                </Typography>
                <Typography>
                  <strong>เบอร์โทร:</strong> {selectedContact.phone}
                </Typography>
                <Typography>
                  <strong>บริการ:</strong> {selectedContact.needs}
                </Typography>
                <Typography>
                  <strong>งบประมาณ:</strong>{" "}
                  {Number(selectedContact.budget).toLocaleString("th-TH")} บาท
                </Typography>
                <Typography>
                  <strong>ขนาดพื้นที่:</strong> {selectedContact.areaSize} ตร.ม.
                </Typography>
                <Typography>
                  <strong>รายละเอียดเพิ่มเติม:</strong>{" "}
                  {selectedContact.details}
                </Typography>
                <Typography>
                  <strong>วันที่ส่ง:</strong> {selectedContact.createdAt}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedContact(null)}>ปิด</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
}
