
import type {
  PageContextBuiltInServer,
  /*
  // When using Client Routing https://vite-plugin-ssr.com/clientRouting
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
  /*/
  // When using Server Routing
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient
  //*/
} from 'vite-plugin-ssr/types'

type Page = (pageProps: unknown) => React.ReactElement
export type PageProps = Record<string, unknown> & {
  breadcrumbs?: BreadcrumbsEntry[]
}

export type PageContextCustom = {
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
    getDocumentProps?: (pageProps: PageProps) => {title?: string, description?: string}
  }
}

export type PageContextServer = PageContextBuiltInServer<Page> & PageContextCustom
export type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

export type PageContext = PageContextClient | PageContextServer

export type BreadcrumbsEntry = {
  name: string
  href?: string
};
