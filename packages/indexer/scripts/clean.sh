#!/bin/bash

echo "Restarting services"
pnpm -w services:stop && pnpm -w sevices:start

echo "Make sure to reset the current development processes."