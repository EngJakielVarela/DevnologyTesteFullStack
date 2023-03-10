import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import { format } from "date-fns";
import Link from "next/link";
import AuthUser from '../../components/sessions/AuthUser';
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const Profile = () => {
  const { http, getToken } = AuthUser();
  const router = useRouter();
  const [allInvoices, setAllInvoices] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {

    if (!getToken()) {
      router.push("/login");
    }

    setUserEmail(sessionStorage.getItem("user"));

    http(getToken()).get(`/v1/invoice`, {})
      .then(res => {
        const response = res.data;
        setAllInvoices(response);
      })
      .catch(err => {
      });

  }, []);


  console.log(allInvoices);

  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="My Profile"
      // button={
      //   <Link href="/profile/edit">
      //     <Button color="primary" bg="primary.light" px="2rem">
      //       Edit Profile
      //     </Button>
      //   </Link>
      // }
      />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              <Avatar src="/assets/images/faces/ralph.png" size={64} />
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">{userEmail.substring(0, userEmail.indexOf("@"))}</H5>
                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint">
                        Balance:
                      </Typography>
                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        {
                          //get price total from all invoices
                          allInvoices.reduce((total, invoice) => total + invoice.price, 0)
                        }
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography
                    ontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    SILVER USER
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              <Grid item lg={3} sm={6} xs={6} key="All Orders">
                <FlexBox
                  as={Card}
                  flexDirection="column"
                  alignItems="center"
                  height="100%"
                  p="1rem 1.25rem"
                >
                  <H3 color="primary.main" my="0px" fontWeight="600">
                    {allInvoices.length}
                  </H3>
                  <Small color="text.muted" textAlign="center">
                    All Orders
                  </Small>
                </FlexBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Name
          </Small>
          <span>
            {userEmail.substring(0, userEmail.indexOf("@"))}
          </span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Email
          </Small>
          <span>{userEmail}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Phone
          </Small>
          <span></span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Birth date
          </Small>
          <span className="pre">

          </span>
        </FlexBox>
      </TableRow>
    </div>
  );
};

const infoList = [
  {
    title: "16",
    subtitle: "All Orders",
  },
  {
    title: "02",
    subtitle: "Awaiting Payments",
  },
  {
    title: "00",
    subtitle: "Awaiting Shipment",
  },
  {
    title: "01",
    subtitle: "Awaiting Delivery",
  },
];

Profile.layout = DashboardLayout;

export default Profile;
