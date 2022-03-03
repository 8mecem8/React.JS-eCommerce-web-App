import React, { useEffect, useState } from "react";


/* Material Uİ */
import { Box, Card, Grid, Typography, Button } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {amber,green,indigo,lightGreen,red} from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";







import { PageHeader } from "./SubComponents/CommonComponent";
import { DisplayCardGraph } from "./SubComponents/GraphComponent";

import {fakeArrayDataGenerator, randomValueGenerator,} from "./SubComponents/utils/fakeArrayDataGenetator";
import UserOverviewComponent from "./SubComponents/UserOverviewComponent";
import ListSection from "./SubComponents/ListSection";



/* Custom Css */
import useStyles from './AdminDashBoardStyles'



import pic from './01.jpg';


function AdminDashBoard() {

    const classes = useStyles();

    const [fetched, setFetched] = useState(false);
    const [posts, setPosts] = useState([]);
    const [authors, setauthors] = useState([]);

  const DisplayData = [
    {
      label: "Orders",
      value: randomValueGenerator({ digit: 1000 }),
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Customers",
      value: randomValueGenerator({ digit: 100 }),
      icon: <ArrowDropUpIcon />,
      iconLabel: "9%",
    },
    {
      label: "New Customers",
      value: randomValueGenerator({ digit: 100 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
    },
    {
      label: "Total visitors",
      value: randomValueGenerator({ digit: 1000 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: "30%",
    },
  ];

  const GraphCardData = [
    {
      id: "Orders",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: blue[500],
      bgColor: blue[50],
    },
    {
      id: "Customers",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: indigo[500],
      bgColor: indigo[50],
    },
    {
      id: "New Customers",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: lightGreen[500],
      bgColor: lightGreen[50],
    },
    {
      id: "Total visitors",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: amber[500],
      bgColor: amber[50],
    },
  ];

  useEffect(() => {
    if (!fetched) {
      GraphCardData.map((item, i) =>
        DisplayCardGraph({
          id: item.id,
          data: item.data,
          brColor: item.brColor,
          bgColor: item.bgColor,
        })
      );
      setFetched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched]);

  

    return (
        <>
        <section style={{backgroundImage:`linear-gradient(rgb(255 255 255 / 70%), rgb(25 118 210)),url(${pic})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",height: "100vw",zIndex:1}}>

           
           <Box sx={{mx:10}}>
      

                    <PageHeader label='Dashboard' pageTitle='blog Overview' />
                    
                    <Grid container spacing={1}>
                        {DisplayData.map((item, i) => (
                        <Grid item xs={6} sm={3} key={i} >
                            <Card>
                            <CardContent className={classes.cardContent}>
                                <canvas
                                id={item.label}
                                className={classes.displayCardGraph}></canvas>

                                <Typography variant='body2' className={classes.cardLabel}>
                                {item.label}
                                </Typography>
                                <Typography
                                variant='h5'
                                component='h6'
                                className={classes.cardTitle}>
                                {item.value}
                                </Typography>
                                <Typography
                                component='p'
                                style={{
                                    textAlign: "center",
                                    marginBottom: "0px",
                                }}>
                                <Button
                                    size='small'
                                    className={classes.ratioBtn}
                                    startIcon={item.icon}
                                    style={{
                                    color: item.label[0] === "P" ? green[600] : red[500],
                                    }}>
                                    {item.iconLabel}
                                </Button>
                                </Typography>
                            </CardContent>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>

                    <UserOverviewComponent />

                    <ListSection posts={posts} authors={authors} />
            </Box>











        </section>
        </>
    )
}

export default AdminDashBoard
