import CustomHeader from "./header";
import CustomFooter from "./footer";
import CustomSidebar from "./Sidebar";
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';



export default function Layout(props) {

  return (
    <Container>

      <Container>
        <Sidebar>
          <CustomSidebar />
        </Sidebar>
        <Content>
        <Header>
        <CustomHeader />
        </Header>

          <div className="w-full h-full min-h-screen">
            <main className="flex-1 lg:container px-4 py-4 mx-auto md:px-6 md:py-12">
              {props.children}
            </main>
          </div>
        </Content>

      </Container>
      <Footer>
        <CustomFooter />

      </Footer>
    </Container>
  );
}
