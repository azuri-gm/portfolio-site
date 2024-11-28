/* eslint-disable @typescript-eslint/no-var-requires */
import { withContentlayer } from 'next-contentlayer'
import { withAxiom } from 'next-axiom'
import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {}

module.exports = withAxiom(withContentlayer(nextConfig))
