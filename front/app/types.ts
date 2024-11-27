export interface NavlinkProps {
    country: string
    region: string
}

export interface ParamsPageProps {
    params: { country: string }
}

export interface CountryProps {
    name: string
    population: number
    flag: string
}

export interface CountryByRegionProps {
    name: string
    region: string
}