import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="light" narrow>
      <SectionHeading title="Error 404" script="Página no encontrada">
        La dirección que buscás no existe o fue movida.
      </SectionHeading>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button to="/" icon="→">
          Volver al inicio
        </Button>
      </div>
    </Section>
  );
}
