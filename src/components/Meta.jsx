import Head from 'next/head';


const Meta = ({title}) =>{
    return(
        <Head key="app_head">
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>{title}</title>
      </Head>
    )
}



export default Meta;