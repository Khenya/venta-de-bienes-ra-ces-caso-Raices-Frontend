import { CSSProperties } from 'react';
import { Colors } from './Colors';

const styles: Record<string, CSSProperties> = {
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '40PX',
    marginBottom: '40PX',
  },
  confirmButton: {
    padding: '10px 20px',
    backgroundColor: Colors.text_color,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    color: '#000',
    border: `1px solid ${Colors.text_color}`, 
    borderRadius: '4px',
    cursor: 'pointer',
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
    textAlign: "left",
    position: "relative",
    maxHeight: "72vh",
    overflowY: "auto", 
  },
  closeIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  paginationButton: {
    padding: "8px 16px",
    border: `1px solid ${Colors.text_color}`,
    backgroundColor: "#fff",
    color: Colors.text_color,
    fontWeight: "500",
    borderRadius: "2px",
    cursor: "pointer",
  },
  paginationButtonDisabled: {
    padding: "8px 16px",
    border: `1px solid ${Colors.primary}`,
    backgroundColor: Colors.backgroundColor,
    color: "#aaa",
    fontWeight: "500",
    borderRadius: "2px",
    cursor: "not-allowed",
  },
  paginationCurrent: {
    padding: "8px 16px",
    backgroundColor: Colors.text_color,
    color: "#fff",
    fontWeight: "bold",
    border: `1px solid ${Colors.text_color}`,
    borderRadius: "2px",
  },
  buttonsContainerNext: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "24px",
    gap: "0px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: `1px solid ${Colors.text_color}`,
  },
  tableHeader: {
    backgroundColor: "#ccc",
    borderBottom: `1px solid ${Colors.primary}`,
  },
  tableRow: {
    borderBottom: `1px solid ${Colors.text_color}`,
  },
  tableCell: {
    padding: "12px",
    border: `1px solid ${Colors.text_color}`,
    color: "#333",
  },
  titel:{
    fontSize: "20px", 
    fontWeight: "bold", 
    marginBottom: "20px",
    color: Colors.text_color
  },
  formGroup: {
    margin: '20px',
    textAlign: 'left',
  },
  
  formLabel: {
    fontWeight: '500',
    marginBottom: '8px',
    display: Colors.text_color,
    color: Colors.text_color,
  },
  
  formInput: {
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${Colors.text_color}`,
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    color: '#333',
    lineHeight: "1.2"
  },
  
};

export default styles;

