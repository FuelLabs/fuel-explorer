#!/bin/bash

pnpm -w services:start

cargo test

pnpm -w services:stop
