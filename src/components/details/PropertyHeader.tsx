import styles from '../../app/config/theme/PropertyHeader.module.css';

const PropertyHeader = () => (
  <div className={styles.propertyContainer}>
    <div className={styles.propertyTitle}>Aydee Choque</div>
    <div className={styles.propertyGrid}>
      <div>Manzano: 1</div>
      <div>Lote: 10</div>
      <div>METROS CUADRADOS: 333.3</div>
      <div>UBICACIÓN: Frente a la Plaza central</div>
      <div>N° DE INMUEBLE: 52105</div>
      <div>N° DE FOLIO: 201803005728</div>
    </div>
  </div>
);

export default PropertyHeader;