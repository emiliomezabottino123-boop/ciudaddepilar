import PageHeader from "../components/layout/PageHeader";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import PhonePill from "../components/ui/PhonePill";
import AgencyCard from "../components/contactos/AgencyCard";
import Card from "../components/ui/Card";
import { agencias } from "../data/site";
import "./Contactos.css";

export default function Contactos() {
  const nemby = agencias.find((agencia) => agencia.id === "nemby");

  return (
    <>
      <PageHeader kicker="Canales" script="de atención">
        Comunicate con la agencia más cercana para consultar disponibilidad,
        pasajes o encomiendas.
      </PageHeader>

      {/* ---------- Teléfonos por ciudad ---------- */}
      <Section tone="surface">
        <ul className="contactos__telefonos">
          {agencias.map(({ id, ciudad, pasajes }) => (
            <li className="contactos__item" key={id}>
              <h2 className="contactos__ciudad">
                <span aria-hidden="true">📍</span> {ciudad}
              </h2>
              <PhonePill numero={pasajes.telefono} tel={pasajes.tel} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Ubicación ---------- */}
      <Section tone="light">
        <SectionHeading eyebrow="Cómo llegar" title="Nuestra" script="ubicación" />

        <div className="contactos__ubicacion">
          <Card icon="🗺️" title={`Agencia ${nemby.ciudad}`} accent>
            {nemby.direccion}
          </Card>

          {/* TODO: reemplazar por un iframe de Google Maps con la ubicación real. */}
          <div className="contactos__mapa" role="img" aria-label="Mapa pendiente">
            <span>Mapa próximamente</span>
          </div>
        </div>
      </Section>

      {/* ---------- Horarios de atención por agencia ---------- */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Venta de pasajes"
          title="Horarios"
          script="de atención"
        />

        <div className="contactos__agencias">
          {agencias.map((agencia) => (
            <AgencyCard key={agencia.id} agencia={agencia} servicio="pasajes" />
          ))}
        </div>
      </Section>
    </>
  );
}
