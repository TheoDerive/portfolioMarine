import "@/style/style.css";

export default function ErrorPage() {
  return (
    <main
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img style={{ width: "40%" }} src={"/erreure 404.gif"} alt="" />
    </main>
  );
}
