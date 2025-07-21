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
  Skeleton,
  Tooltip,
} from '@mui/material';

export default function ContactList() {
  const { data: session, status } = useSession();
  const [contacts, setContacts] = useState([]);
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
        if (isMounted) setContacts(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'เกิดข้อผิดพลาด');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchContacts();
    return () => { isMounted = false; };
  }, [session, status]);

  return (
    <Card sx={{ p: 3, width: '100%', overflowX: 'auto' }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        📋 รายการ Contact ทั้งหมด
      </Typography>

      {loading ? (
        <SkeletonTable />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : contacts.length === 0 ? (
        <Alert severity="info">ยังไม่มีข้อมูลติดต่อ</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ชื่อ</TableCell>
                <TableCell>อีเมล</TableCell>
                <TableCell>เบอร์</TableCell>
                <TableCell>บริการ</TableCell>
                <TableCell>งบประมาณ (บาท)</TableCell>
                <TableCell>ขนาดพื้นที่ (ตร.ม.)</TableCell>
                <TableCell>รายละเอียด</TableCell>
                <TableCell>วันที่</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((c) => (
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
        <Skeleton key={idx} variant="rectangular" height={40} sx={{ mb: 1, borderRadius: 1 }} />
      ))}
    </Box>
  );
}
