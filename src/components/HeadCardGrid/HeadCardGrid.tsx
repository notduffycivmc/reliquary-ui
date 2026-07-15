import { useEffect, useState, useRef } from "react";

import { Head } from "../../types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography"
import HeadCard from "./HeadCard";



interface HeadGridProps {
  heads: Head[],
  pageSize: number,
  addFunc: (head: Head) => void
  viewFunc: (head: Head) => void
}


export default function HeadCardGrid({ heads, pageSize, addFunc, viewFunc }: HeadGridProps) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [filteredHeads, setFilteredHeads] = useState<Head[]>([]);
  const isFirstRender = useRef(true);

  // Reset page when filters change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(1);
  }, [heads.length]);

  // Update the filtered heads with the state's page
  useEffect(() => {
    const start = (page - 1) * pageSize;
    setFilteredHeads(heads.slice(start, start + pageSize));
    setPageCount(Math.ceil(heads.length / pageSize));
  }, [page, heads, pageSize]);

  const onPageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    if (value === page) return;
    setPage(value);
    window.scrollTo(0, 0);
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 4}}>
        <Typography variant="caption"> {pageSize > heads.length ? heads.length : pageSize} out of {heads.length} Heads Displayed</Typography>
      </Box>
      <Grid container spacing={2} sx={{justifyContent: 'center'}}>
        {filteredHeads.map(head => (
          <HeadCard 
            key={head.uuid} 
            head={head} 
            addFunc={addFunc}
            viewFunc={viewFunc}
          />
        ))}
      </Grid>
      { pageCount > 1 &&
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 4 , gap: 1}}>
          <Typography variant="caption">Page {page} of {pageCount}</Typography>
          <Pagination count={pageCount} page={page} onChange={onPageChange} color="secondary" />
        </Box>
      }
    </Box>
  )
}
