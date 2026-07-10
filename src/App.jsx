import { useState, useEffect, useMemo, useDeferredValue } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import ShoppingCart from "./services/ShoppingCart";

import ButtonTray from "./components/ButtonTray/ButtonTray";
import DiscordJoinBar from "./components/DiscordJoinBar/DiscordJoinBar";
import HeadFilterBar from "./components/HeadFilterBar/HeadFilterBar";
import HeadCardGrid from "./components/HeadCardGrid/HeadCardGrid";
import OpenCartButton from "./components/ButtonTray/OpenCartButton";
import CartDrawer from "./components/ShoppingCart/CartDrawer";

import './App.css'
import { Draw, Shop } from '@mui/icons-material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

function DiscordIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </SvgIcon>
  );
}

function App() {
  const [heads, setHeads] = useState([]);
  const [rarities, setRarities] = useState(new Set())
  const [tags, setTags] = useState(new Set());

  const [searchName, setSearchName] = useState('');
  const [searchRarity, setSearchRarity] = useState('All');
  const [searchTag, setSearchTag] = useState('All');

  const [shoppingCart, setShoppingCart] = useState(new ShoppingCart());
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
  const [shoppingCartHasItems, setShoppingCartHasItems] = useState(true);

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCurrencyExchangeOpen, setIsCurrencyExchangeOpen] = useState(false);


  // Load Heads
  useEffect(() => {
    fetch('/reliquary-ui/heads.json')
      .then(res => res.json())
      .then(data => {
        setHeads(data);
        const cart = new ShoppingCart();
        setShoppingCart(cart);
        setShoppingCartHasItems(cart.size);
    })
  }, []);

  // Load Rarities and Tags
  useEffect(() => {
    setRarities(new Set(heads.map(h => h.rarity)));
    setTags(new Set(heads.flatMap(h => h.tags)));
  }, [heads])

  // Head Filtering for Grid
  const filteredHeads = useMemo(() => {
    return heads.filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesRarity = searchRarity === 'All' || h.rarity === searchRarity;
      const matchesTag = searchTag === 'All' || h.tag === searchTag;
      return matchesSearch && matchesRarity && matchesTag;
    });
  }, [heads, rarities, tags, searchName, searchRarity, searchTag]);

  const handleClickCloseDrawer = () => {
    setIsShoppingCartOpen(false);
    setIsCurrencyExchangeOpen(false);
    setIsHelpOpen(false);
  }

  const clearShoppingCart = () => {
    setShoppingCart(new ShoppingCart());
    setShoppingCartHasItems(false);
  }

  const modifyShoppingCart = (head, amount) => {
    const updatedCart = new ShoppingCart();
    updatedCart.items = shoppingCart.items
    if (amount > 0) updatedCart.addItem(head);
    else if (amount < 0) updatedCart.removeItem(head);
    setShoppingCart(updatedCart);
    setShoppingCartHasItems(updatedCart.size !== 0)
  }

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <Box onClick={handleClickCloseDrawer}>
            {/* Button Tray */}
            <ButtonTray 
              openCartButtonProps={{
                openCart: (value) => setIsShoppingCartOpen(value),
                cartSize: shoppingCart.size
              }}
            />
            {/* Shopping Cart */}
            <CartDrawer 
              isOpen={isShoppingCartOpen}
              cart={shoppingCart} 
              closeFunc={() => setIsShoppingCartOpen(false)}
              addFunc={(head) => modifyShoppingCart(head, 1)}
              removeFunc={(head) => modifyShoppingCart(head, -1)}
              clearFunc={() => clearShoppingCart()}
              exportFunc={shoppingCart.exportData}
            />
            {/* Hero */}
            <Box sx={{ paddingY: 4 }}>
              <Typography variant='h1'>Reliquary</Typography>
              <Typography variant='h6'>Head Shop Browser</Typography>
              <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>Managed by NotDuffy</Typography>
            </Box>
            <Divider />
            {/* Discord Information */}
            <DiscordJoinBar />
            <Divider />
            {/* Head Filter */}
            <HeadFilterBar 
              search={searchName} onSearchNameChange={setSearchName}
              rarity={searchRarity} onSearchRarityChange={setSearchRarity}
              tag={searchTag} onSearchTagChange={setSearchTag}
              rarities={rarities} 
              tags={tags} 
            />
            <Divider />
            {/* Head Grid */}
            <HeadCardGrid heads={filteredHeads} pageSize={50} addFunc={(head) => modifyShoppingCart(head, 1)}/>
            <Divider />
            {/* Discord Information */}
            <DiscordJoinBar />
            <Divider />
            {/* TODO: FOOTER */}
          </Box>
          
      </ThemeProvider>
  )
}

export default App
