'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Chip,
  Tooltip,
  Skeleton,
  TextField,
  Button,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';

export default function ContactListWithSearchExport() {
  const { data: session, status } = useSession();
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status !== 'authenticated') return;
    let isMounted = true;

    const fetchContacts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
          headers: { Authorization: `Bearer ${session.backendToken}` },
        });
        if (!res.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ');
        const data = await res.json();
        if (isMounted) {
          setContacts(data);
          setFiltered(data);
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'เกิดข้อผิดพลาด');
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
          c.needs.join(',').toLowerCase().includes(term)
      )
    );
  }, [search, contacts]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filtered.map((c) => ({
        ไอดี: c.id,
        ชื่อ: c.fullName,
        อีเมล: c.email,
        เบอร์ติดต่อ: c.phone,
        งบประมาณ: c.budget,
        ขนาดพื้นที่: c.areaSize,
        ความต้องการ: c.needs.join(', '),
        รายละเอียด: c.details,
        วันที่: new Date(c.createdAt).toLocaleString('th-TH'),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
    XLSX.writeFile(workbook, 'contacts.xlsx');
  };

  return (
    <Card sx={{ p: 3, width: '100%', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          📋 รายการ Contact ทั้งหมด
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
            sx={{ whiteSpace: 'nowrap' }}
          >
            Export Excel
          </Button>
        </Box>
      </Box>

      {loading ? (
        <SkeletonTable />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : filtered.length === 0 ? (
        <Alert severity="info">ไม่พบข้อมูลที่ค้นหา</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ชื่อ</TableCell>
                <TableCell>อีเมล</TableCell>
                <TableCell>เบอร์</TableCell>
                <TableCell>บริการ</TableCell>
                <TableCell>งบประมาณ</TableCell>
                <TableCell>ขนาดพื้นที่</TableCell>
                <TableCell>รายละเอียด</TableCell>
                <TableCell>วันที่</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.fullName}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>
                    {c.needs.map((need, idx) => (
                      <Chip
                        key={idx}
                        label={need}
                        size="small"
                        color="primary"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>{Number(c.budget).toLocaleString('th-TH')}</TableCell>
                  <TableCell>{c.areaSize}</TableCell>
                  <TableCell>
                    <Tooltip title={c.details || '-'}>
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: 150,
                        }}
                      >
                        {c.details || '-'}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {new Date(c.createdAt).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
}

function SkeletonTable() {
  const rows = Array.from({ length: 5 });
  return (
    <Box sx={{ mt: 2 }}>
      {rows.map((_, idx) => (
        <Skeleton
          key={idx}
          variant="rectangular"
          height={40}
          sx={{ mb: 1, borderRadius: 1 }}
        />
      ))}
    </Box>
  );
}
