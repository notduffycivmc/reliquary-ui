import { useState } from 'react';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

interface HeadFilterBarProps {
  search: string
  rarity: string
  tag: string
  onSearchNameChange: (value: string) => void
  onSearchRarityChange: (value: string) => void
  onSearchTagChange: (value: string) => void
  rarities: Set<string>;
  tags: Set<string>;
}

export default function HeadFilterBar(
  { search, rarity, tag, onSearchNameChange, onSearchRarityChange, onSearchTagChange, rarities, tags }: HeadFilterBarProps
) {  
  return (
    <Stack direction="row" spacing={2} sx={{ padding: 2, justifyContent: 'space-around', width: '100%' }}>
      <TextField
        label="Search by name"
        variant="outlined"
        color="secondary"
        size="small"
        value={search}
        sx={{flex: 3}}
        onChange={(e) => onSearchNameChange(e.target.value)}
      />
      <TextField
        select
        label="Rarity"
        color="secondary"
        size="small"
        value={rarity}
        onChange={(e) => onSearchRarityChange(e.target.value)}
        defaultValue="All"
        sx={{flex: 1, textAlign: 'left'}}
      >
        <MenuItem key="All" value="All">All</MenuItem>
        {Array.from(rarities).map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
      </TextField>
      <TextField
        select
        label="Tag"
        color="secondary"
        value={tag}
        size="small"
        onChange={(e) => onSearchTagChange(e.target.value)}
        defaultValue="All"
        sx={{flex: 1, textAlign: 'left'}}
      >
        <MenuItem key="All" value="All">All</MenuItem>
        {Array.from(tags).map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
      </TextField>
    </Stack>
  );
}