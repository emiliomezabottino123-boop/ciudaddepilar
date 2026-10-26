import PageHeader from "../components/layout/PageHeader";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import { servicios } from "../data/site";

export default function Servicios() {
  return (
    <>
      <PageHeader kicker="Descubrí" script="Nuestros servicios">
        Pasajes y encomiendas entre Asunción y Pilar, con atención en nuestras
        agencias de Asunción, Ñemby y Pilar.
      </PageHeader>

      {/* TODO: ampliar cada servicio con detalle, fotos y precios. */}
      <Section tone="surface">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {servicios.map(({ id, titulo, descripcion, icono }) => (
            <Card key={id} icon={icono} title={titulo} accent>
              {descripcion}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
