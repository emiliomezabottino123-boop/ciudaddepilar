import PageHeader from "../components/layout/PageHeader";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";

export default function QuienesSomos() {
  return (
    <>
      <PageHeader kicker="Conocé" script="Quiénes somos">
        Una empresa de transporte con raíces en Pilar, Ñeembucú, que conecta
        el sur del país con Asunción todos los días.
      </PageHeader>

      {/* TODO: completar con la historia real, fotos de la flota y equipo. */}
      <Section tone="surface" narrow>
        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
        </p>
      </Section>

      <Section tone="light">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          <Card icon="🎯" title="Misión" accent>
            Conectar Pilar con Asunción con puntualidad, seguridad y trato
            cercano.
          </Card>
          <Card icon="👁️" title="Visión" accent>
            Ser la empresa de transporte de referencia de Ñeembucú.
          </Card>
          <Card icon="🤝" title="Valores" accent>
            Compromiso, seguridad, respeto y mejora continua.
          </Card>
        </div>
      </Section>
    </>
  );
}
