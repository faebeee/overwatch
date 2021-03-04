#!/usr/bin/env node

import overwatch from './src/overwatch';

overwatch( [], './configs/projects/**/*.js', './configs/test-cases/**/*.js' )
