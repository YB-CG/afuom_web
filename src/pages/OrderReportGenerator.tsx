import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Order } from '../services/order/orderSlice';
import { FaDownload } from 'react-icons/fa'; // Import download icon

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#f5fef8', // Light green background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottom: '2px solid #28a745',
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    height: 40,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745', // Green color for text
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#28a745',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  table: {
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e0e0e0',
    paddingVertical: 5,
  },
  tableCol: {
    width: '33%',
    textAlign: 'left',
    paddingHorizontal: 5,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#28a745',
  },
  tableCell: {
    fontSize: 10,
    color: '#444',
  },
  itemList: {
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  itemText: {
    fontSize: 10,
    color: '#444',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#aaa',
  },
});

const OrderReportDocument: React.FC<{ orders: Order[] }> = ({ orders }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image style={styles.logo} src="/path/to/your/logo.png" />
        <Text style={styles.companyName}>Afuom</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Order Report</Text>

      {/* Orders Section */}
      {orders.map((order) => (
        <View key={order.id} style={styles.section}>
          <Text style={{ fontSize: 14, marginBottom: 5, fontWeight: 'bold' }}>
            Order #{order.id}
          </Text>

          {/* Order Summary Table */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Date</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Status</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>Total</Text>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {new Date(order.created_at).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{order.status}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  ${Number(order.total_price).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* Items List */}
          <Text style={{ fontSize: 12, marginTop: 8, fontWeight: 'bold' }}>Items:</Text>
          <View style={styles.itemList}>
            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemText}>{item.product.name}</Text>
                <Text style={styles.itemText}>Qty: {item.quantity}</Text>
                <Text style={styles.itemText}>${Number(item.price).toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Footer Section */}
      <Text style={styles.footer}>
        © {new Date().getFullYear()} Afuom. All rights reserved.
      </Text>
    </Page>
  </Document>
);

const OrderReportGenerator: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <PDFDownloadLink
        document={<OrderReportDocument orders={orders} />}
        fileName="order_report.pdf"
        style={{
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <FaDownload style={{ marginRight: 8 }} />
        Download Order Report
      </PDFDownloadLink>
    </div>
  );
};

export default OrderReportGenerator;
