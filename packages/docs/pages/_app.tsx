import { Button, GlobalStyles, Grid } from '@bigcommerce/big-design';
import { theme } from '@bigcommerce/big-design-theme';
import themes from 'big-design-themes';
import produce from 'immer';
import App from 'next/app';
import Head from 'next/head';
import { default as Router } from 'next/router';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { BetaRibbon, SideNav, StoryWrapper } from '../components';
import { pageView } from '../utils/analytics/gtm';

Router.events.on('routeChangeComplete', url => pageView(url));

const darkTheme = produce(theme, draft => {
  draft.colors = { ...draft.colors, ...themes.darkTheme.colors };
});

const gridTemplate = {
  mobile: `
    "nav" 80px
    "main" min-content
    / 100%;
  `,
  tablet: `
    ". nav main ." 1fr
    / 1fr 210px minmax(min-content, 1050px) 1fr;
  `,
};

export default class MyApp extends App {
  readonly state = {
    selectedTheme: 'dark',
  };

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <link rel="icon" type="image/png" href={`${process.env.URL_PREFIX}/static/favicon.png`}></link>
          <title>BigDesign</title>
        </Head>
        <style jsx global>
          {`
            @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600');

            html,
            body,
            #__next {
              height: 100%;
            }
          `}
        </style>
        <ThemeProvider theme={this.state.selectedTheme === 'dark' ? darkTheme : theme}>
          <>
            <GlobalStyles />
            {router.query.noNav ? (
              <Component {...pageProps} />
            ) : (
              <>
                <Grid
                  gridTemplate={gridTemplate}
                  backgroundColor="background"
                  gridGap="0"
                  style={{ minHeight: '100%' }}
                >
                  <Grid.Item gridArea="nav">
                    <SideNav />
                  </Grid.Item>
                  <Grid.Item
                    gridArea="main"
                    marginVertical="medium"
                    marginHorizontal={{ mobile: 'none', tablet: 'xxLarge' }}
                    style={{ maxWidth: '100%' }}
                  >
                    <Button onClick={this.toggleTheme}>{this.state.selectedTheme}</Button>
                    <StoryWrapper>
                      <Component {...pageProps} />
                    </StoryWrapper>
                  </Grid.Item>
                </Grid>
                <BetaRibbon />
              </>
            )}
          </>
        </ThemeProvider>
      </>
    );
  }

  private toggleTheme = () => {
    this.setState({ selectedTheme: this.state.selectedTheme === 'light' ? 'dark' : 'light' });
  };
}
