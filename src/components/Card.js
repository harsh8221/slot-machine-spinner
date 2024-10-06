import * as React from "react"
import cx from 'classnames';

const Card = (({ className, ...props }) => (
  <div

    className={cx(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = (({ className, ...props }) => (
  <div

    className={cx("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = (({ className, ...props }) => (
  <h3

    className={cx(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = (({ className, ...props }) => (
  <p

    className={cx("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = (({ className, ...props }) => (
  <div className={cx("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = (({ className, ...props }) => (
  <div

    className={cx("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }