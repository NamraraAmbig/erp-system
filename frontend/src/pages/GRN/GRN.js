import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import API from '../../services/api';

function GRN() {
  const [grns, setGrns] = useState([]);

  useEffect(() => {
    API.get('/grn').then(({ data }) => setGrns(data)).catch(console.error);
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>Goods Receipt Notes</Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1e1e2d' }}>
            <TableRow>
              {['GRN ID','Purchase Order','Received Date','Notes'].map(h => (
                <TableCell key={h} sx={{ color: 'white' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {grns.map((g) => (
              <TableRow key={g._id}>
                <TableCell>{g._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>{g.purchaseOrder?._id?.slice(-6).toUpperCase() || 'N/A'}</TableCell>
                <TableCell>{new Date(g.receivedDate).toLocaleDateString()}</TableCell>
                <TableCell>{g.notes || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default GRN;