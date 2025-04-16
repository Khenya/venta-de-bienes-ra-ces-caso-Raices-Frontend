import styles from '../../app/config/theme/Card.module.css';

interface Props {
  property: {
    owner_names: string;
    manzano: number;
    batch: number;
    meters: number;
    location: string;
    property_number: number;
    folio_number: number;
  };
}

const PropertyHeader: React.FC<Props> = ({ property }) => (
  <div className={styles.propertyContainer}>
    <div className={styles.propertyTitle}>{property.owner_names}</div>
    <div className={styles.propertyGrid}>
      <div>Manzano: {property.manzano}</div>
      <div>Lote: {property.batch}</div>
      <div>METROS CUADRADOS: {property.meters}</div>
      <div>UBICACIÓN: {property.location}</div>
      <div>N° DE INMUEBLE: {property.property_number}</div>
      <div>N° DE FOLIO: {property.folio_number}</div>
    </div>
  </div>
);

export default PropertyHeader;