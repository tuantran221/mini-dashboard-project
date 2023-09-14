import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Person4Icon from "@mui/icons-material/Person4";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";

const routes = [
  { path: "/", text: "Home", icon: <HomeIcon /> },
  { path: "/profile", text: "Profile", icon: <Person4Icon /> },
  { path: "/quiz_game", text: "Quiz Game", icon: <QuizIcon /> },
];

export function RoutesPage() {
  const router = useRouter();
  // --------- logOut function -------------
  const logOut = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <Box>
      <List>
        {routes.map((route, index) => (
          <Link href={route.path} key={index} style={{ all: "unset" }}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText>{route.text}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List>
        <ListItem disablePadding sx={{ display: "block", marginTop: "300px" }}>
          <ListItemButton onClick={logOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>LogOut</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
