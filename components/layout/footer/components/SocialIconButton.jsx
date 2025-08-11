import { IconButton } from "@mui/material";

export default function SocialIconButton({ href, color, icon: Icon }) {
  return (
    <IconButton
      href={href}
      target="_blank"
      sx={{
        color,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.2)",
        },
      }}
    >
      <Icon />
      <span className="sr-only">{href}</span>
    </IconButton>
  );
}