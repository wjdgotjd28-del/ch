import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Item = {
  product: string;
  amount: string;
};

export default function ShoppingList() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([item, ...items]);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">쇼핑 리스트</Typography>
        </Toolbar>
      </AppBar>
      <AddItem addItem={addItem}></AddItem>

      {/* ✅ 리스트 출력 (MUI List) */}
      <List>
        {items.map((i, idx) => (
          <ListItem key={idx} divider>
            <ListItemText
              primary={i.product}
              secondary={`수량: ${i.amount}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

type AddItemProps = {
  addItem: (item: Item) => void;
};

function AddItem(props: AddItemProps) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({
    product: "",
    amount: "",
  });

  const navigate = useNavigate();

  const handleAdd = () => {
    if (item.product.trim() === "" || item.amount.trim() === "") return;
    props.addItem(item);
    setItem({ product: "", amount: "" }); // 입력창 초기화
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>아이템 추가</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>새 아이템</DialogTitle>
        <DialogContent>
          <TextField
            label="상품명"
            margin="dense"
            fullWidth
            value={item.product}
            onChange={(e) => setItem({ ...item, product: e.target.value })}
          />
          <TextField
            label="수량"
            margin="dense"
            fullWidth
            value={item.amount}
            onChange={(e) => setItem({ ...item, amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>닫기</Button>
          <Button variant="contained" onClick={handleAdd}>
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
