import { Box, Typography } from "@mui/material";

export default function AboutBlock() {
  return (
    <Box
      sx={{
        textAlign: { xs: "center", md: "left" },
        maxWidth: { xs: 700, md: "none" },
        mx: "auto",
        pl: { xs: 0, md: 6 }, // ขยับทางขวาเฉพาะจอใหญ่
      }}
    >

      {/* แบรนด์/สโลแกน */}
      <Typography
        variant="subtitle1"
        sx={{
          color: "#cc8f2a",
          fontWeight: 700,
          letterSpacing: "0.2rem",
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
        }}
      >
        TAURUS :
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: "#000",
          fontWeight: 700,
          letterSpacing: "0.1rem",
          mt: -0.5,
          textTransform: "uppercase",
          fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
        }}
      >
        WE RENEW
      </Typography>

      {/* คำโปรยไทย */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mt: 2,
          color: "#000000ff",
          letterSpacing: "0.3rem",
          fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
        }}
      >
        “สร้างบ้านหลังใหม่ ในที่อยู่อาศัยเดิมของคุณ”
      </Typography>

      {/* ชื่อแบรนด์ย้ำโทนสี */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mt: 2,
          color: "#cc8f2a",
          fontWeight: 700,
          letterSpacing: "0.2rem",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
        }}
      >
        TAURUS
      </Typography>

      {/* เนื้อหาอธิบาย */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "left",
          mt: 1.5,
          whiteSpace: "pre-line",
          color: "#111",
          lineHeight: 1.85,
          letterSpacing: "0.01rem",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
        }}
      >
        {`“ทอรัส” 
        ผู้เชี่ยวชาญด้านการปรับโฉมบ้านพักอาศัย อาคารต่างๆ 
        อย่างมีรสนิยม ด้วยประสบการณ์มากกว่า 30 ปี ให้บริการ
        แบบครบวงจร ตั้งแต่ การสร้างบ้านใหม่ ปรับปรุงต่อเติม
        งานออกแบบตกแต่งภายใน บ้านพักอาศัย คอนโดมิเนียม
        โรงแรม สำนักงาน และอาคารต่างๆ รวมถึงงานเฟอร์นิเจอร์
        ลอยตัว ดำเนินงานโดยทีมผู้เชี่ยวชาญในทุกสาขา
        ทั้งด้านงานออกแบบสถาปัตยกรรมงานตกแต่งภายในและงานโครงสร้างวิศวกรรม
        ภายใต้กระบวนการทำงานอย่างมืออาชีพ ที่พร้อมดูแล
        ตั้งแต่แนวคิดไปจนถึงก่อสร้างจริง และควบคุมไม่ให้งบ
        บานปลาย`}
      </Typography>
    </Box>
  );
}
