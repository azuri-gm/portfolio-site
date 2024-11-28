/* eslint-disable @typescript-eslint/no-var-requires */
const { withContentlayer } = require('next-contentlayer')
const { withAxiom } = require('next-axiom')
import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {}

module.exports = withAxiom(withContentlayer(nextConfig))
