import Hero from "../components/home/Hero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import RouteCard from "../components/horarios/RouteCard";
import {
  empresa,
  salidas,
  servicios,
  telefonoPrincipal,
  waLink,
} from "../data/site";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---------- Salidas del día ---------- */}
      <Section tone="surface" id="salidas">
        <SectionHeading
          eyebrow="Asunción · Ñemby · Pilar"
          title="Horarios"
          script="de Salidas"
        >
          Cubrimos el trayecto entre Asunción y Pilar todos los días, en ambos
          sentidos.
        </SectionHeading>

        <div className="home__rutas">
          {salidas.map(({ id, origen, destino, horarios }) => (
            <RouteCard
              key={id}
              origen={origen}
              destino={destino}
              horarios={horarios}
            />
          ))}
        </div>

        <div className="home__actions">
          <Button to="/horarios" variant="outline">
            Ver horarios de atención
          </Button>
        </div>
      </Section>

      {/* ---------- Servicios ---------- */}
      <Section tone="light" id="servicios">
        <SectionHeading
          eyebrow="Lo que hacemos"
          title="Conocé"
          script="Nuestros servicios"
        >
          Pasajes y encomiendas entre Asunción y Pilar, con atención en nuestras
          tres agencias.
        </SectionHeading>

        <div className="home__grid">
          {servicios.map(({ id, titulo, descripcion, icono }) => (
            <Card key={id} icon={icono} title={titulo} accent>
              {descripcion}
            </Card>
          ))}
        </div>

        <div className="home__actions">
          <Button to="/servicios" variant="outline">
            Ver todos los servicios
          </Button>
        </div>
      </Section>

      {/* ---------- Quiénes somos (resumen) ---------- */}
      <Section tone="surface">
        <div className="home__split">
          <div>
            <SectionHeading
              eyebrow="Nuestra historia"
              title="Somos"
              script="Ciudad de Pilar"
              align="left"
            >
              Conectamos Pilar con Asunción todos los días, con atención
              personalizada en cada agencia y encomiendas entre ambas ciudades.
            </SectionHeading>
            <Button to="/quienes-somos" variant="dark">
              Conocé la empresa
            </Button>
          </div>

          <ul className="home__list">
            <li>Agencias en Asunción, Ñemby y Pilar.</li>
            <li>Seis salidas diarias entre Asunción y Pilar.</li>
            <li>Servicio de encomiendas con agencias dedicadas.</li>
            <li>Atención en Pilar de lunes a domingo.</li>
          </ul>
        </div>
      </Section>

      {/* ---------- Franja CTA ---------- */}
      <Section tone="dark">
        <div className="home__cta-band">
          <div>
            <p className="eyebrow">Reservá tu pasaje</p>
            <p className="script home__cta-script">{empresa.eslogan}</p>
          </div>
          <div className="home__cta-actions">
            <Button to="/horarios" size="lg" icon="→">
              Ver horarios
            </Button>
            <Button
              href={waLink(telefonoPrincipal.tel)}
              variant="outline"
              size="lg"
            >
              WhatsApp Pilar: {telefonoPrincipal.telefono}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
