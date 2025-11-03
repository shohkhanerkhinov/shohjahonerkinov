declare global {
  var portfolioUsers:
    | Array<{
        id: string
        name: string
        email: string
        password: string
        createdAt: string
      }>
    | undefined
}

export {}
