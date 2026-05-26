import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Pietra Doces — Confeitaria Artesanal Premium" },
      {
        name: "description",
        content:
          "Doces artesanais sofisticados — brownies, brigadeiros gourmet, bolos no pote e mais. Encomende pelo WhatsApp.",
      },
    ],
  }),
});

function Index() {
  // O site é HTML/CSS/JS puro em /public — redireciona para servi-lo
  useEffect(() => {
    window.location.replace("/site.html");
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#F8F3ED", fontFamily: "Georgia, serif", color: "#3B2416" }}>
      <p>Carregando Pietra Doces…</p>
    </div>
  );
}
