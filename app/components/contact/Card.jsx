'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
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
  useMediaQuery,
  useTheme,
  Slide,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

export default function ContactListWithDetailModal() {
  const { data: session, status } = useSession();
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchContacts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          headers: { Authorization: `Bearer ${session.backendToken}` },
        });
        if (!res.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ');
        const data = await res.json();
        const formatted = data.map((c) => ({
          id: c.id,
          fullName: c.fullName,
          email: c.email,
          phone: c.phone,
          budget: c.budget,
          areaSize: c.areaSize,
          needs: c.needs.join(', '),
          details: c.details || '-',
          createdAt: c.createdAt, // keep raw, format later in client
        }));
        setContacts(formatted);
        setFiltered(formatted);
      } catch (err) {
        setError(err.message || 'เกิดข้อผิดพลาด');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
    XLSX.writeFile(workbook, 'contacts.xlsx');
  };

  const columns = [
    { field: 'fullName', headerName: 'ชื่อ', flex: 1, minWidth: 150 },
    !isMobile && { field: 'email', headerName: 'อีเมล', flex: 1, minWidth: 180 },
    { field: 'phone', headerName: 'เบอร์', flex: 1, minWidth: 120 },
    { field: 'needs', headerName: 'บริการ', flex: 1, minWidth: 180 },
  ].filter(Boolean);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 1 }}>
      <Card sx={{ p: { xs: 2, sm: 3 }, width: '100%', maxWidth: 1200, mx: 'auto', my: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          📋 รายการ Contact ทั้งหมด
        </Typography>

        {/* Search + Export buttons, stacked on mobile */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 2,
          }}
        >
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
            fullWidth={isMobile}
          >
            Export Excel
          </Button>
        </Box>

        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box sx={{ height: 600, width: '100%', overflowX: 'auto' }}>
            <DataGrid
              rows={filtered}
              columns={columns}
              loading={loading}
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
              onRowClick={(params) => setSelectedContact(params.row)}
              sx={{
                '& .MuiDataGrid-cell': {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              }}
            />
          </Box>
        )}

        <Dialog
          open={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          fullWidth
          maxWidth="sm"
          fullScreen={isMobile}
          TransitionComponent={Slide}
          TransitionProps={{ direction: 'up', onEnter: () => window.scrollTo(0, 0) }}
        >
          <DialogTitle>รายละเอียด Contact</DialogTitle>
          <DialogContent dividers>
            {selectedContact && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                  <strong>งบประมาณ:</strong>{' '}
                  {Number(selectedContact.budget).toLocaleString('th-TH')} บาท
                </Typography>
                <Typography>
                  <strong>ขนาดพื้นที่:</strong> {selectedContact.areaSize} ตร.ม.
                </Typography>
                <Typography>
                  <strong>รายละเอียดเพิ่มเติม:</strong> {selectedContact.details}
                </Typography>
                <Typography>
                  <strong>วันที่ส่ง:</strong>{' '}
                  {new Date(selectedContact.createdAt).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedContact(null)} fullWidth={isMobile}>
              ปิด
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
}
