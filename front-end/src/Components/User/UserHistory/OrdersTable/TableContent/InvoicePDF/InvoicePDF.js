import React from 'react'


import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";




/* , arg.count */


function InvoicePDF({order}) {

    //console.log("order.paymentIntent.created * 1000",new Date(order.paymentIntent.created* 1000))

    console.log("order is in PDF",order.products.map((arg)=>{ return console.log(arg.product.price)}))

  return (
    <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            Order created at {new Date().toLocaleString()} 
          </Text>
          <Text style={styles.title}>Order Invoice</Text>
          <Text style={styles.author}>Invoice Number:</Text>
          <Text style={styles.subtitle}>Order Summary</Text>

          <Table>
            <TableHeader>
              <TableCell>Product(s) Title</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price(s)</TableCell>
              <TableCell>Total Without TAX</TableCell>
              
              
            </TableHeader>
          </Table>

          <Table data={order.products}>
            <TableBody>
              <DataTableCell getContent={(x) => x.product.title} />
              <DataTableCell getContent={(x) => x.product.color} />
              <DataTableCell getContent={(x) => x.count} />
              <DataTableCell getContent={(x) => `$${x.product.price}`} />
              <DataTableCell getContent={(x) => `$${x.product.price * x.count}`} />
              
            </TableBody>
          </Table>

          <Text style={styles.text}>
            <Text>
              Date: {"               "}
              {new Date(order.paymentIntent.created * 1000).toLocaleString()}
            </Text>

            {"\n"}

            <Text>
              Order Id: {"         "}
              {order.paymentIntent.id}
            </Text>

            {"\n"}

            <Text>
              Order Status: {"  "}
              {order.orderStatus}
            </Text>

            {"\n"}
            {"\n"}

            <Text>
              Subtotal: {"         "}
              {order.products.reduce((int,cur)=>{return int + (cur.product.price * cur.count)},0).toFixed(2)}
            </Text>
            
            {"\n"}

            <Text>
              Sales Tax: {"       "}
              {(order.products.reduce((int,cur)=>{return int + (cur.product.price * cur.count)},0)*0.085).toFixed(2)}
            </Text>

            {"\n"}

            <Text>
              Total Paid: {"       "}
              {(order.paymentIntent.amount/100).toFixed(2)}
            </Text>

          </Text>

          <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
          <Text style={styles.footer}>------ MeceM Test React Ecommerce ------</Text>
        </Page>
  </Document>
  )
}



const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 20,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "0px",
    fontSize: 12,
    marginBottom: 0,
    marginTop: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});



export default InvoicePDF