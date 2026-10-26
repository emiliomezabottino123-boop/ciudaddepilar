import PageHeader from "../components/layout/PageHeader";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import RouteCard from "../components/horarios/RouteCard";
import AgencyCard from "../components/contactos/AgencyCard";
import { agencias, salidas, telefonoPrincipal, waLink } from "../data/site";
import "./Horarios.css";

export default function Horarios() {
  const conEncomiendas = agencias.filter((agencia) => agencia.encomiendas);

  return (
    <>
      <PageHeader kicker="Horarios" script="de Salidas">
        Salidas diarias entre Asunción y Pilar. Te recomendamos llegar a la
        agencia 15 minutos antes de la salida.
      </PageHeader>

      {/* ---------- Salidas ---------- */}
      <Section tone="surface">
        <div className="horarios__rutas">
          {salidas.map(({ id, origen, destino, horarios }) => (
            <RouteCard
              key={id}
              origen={origen}
              destino={destino}
              horarios={horarios}
            />
          ))}
        </div>
      </Section>

      {/* ---------- Atención: pasajes ---------- */}
      <Section tone="light">
        <SectionHeading
          eyebrow="Agencia terminal (pasajes)"
          title="Horarios"
          script="de atención"
        />

        <div className="horarios__agencias">
          {agencias.map((agencia) => (
            <AgencyCard key={agencia.id} agencia={agencia} servicio="pasajes" />
          ))}
        </div>
      </Section>

      {/* ---------- Atención: encomiendas ---------- */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Agencia encomiendas"
          title="Horarios"
          script="de atención"
        />

        <div className="horarios__agencias">
          {conEncomiendas.map((agencia) => (
            <AgencyCard
              key={agencia.id}
              agencia={agencia}
              servicio="encomiendas"
            />
          ))}
        </div>

        <div className="horarios__cta">
          <Button
            href={waLink(telefonoPrincipal.tel)}
            icon="→"
          >
            Consultar disponibilidad por WhatsApp
          </Button>
          <Button to="/contactos" variant="outline">
            Ver todos los canales de atención
          </Button>
        </div>
      </Section>
    </>
  );
}
