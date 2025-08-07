# BrockhausLunchTime

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.

## Ausbaustufe 4:
Damit die App regelmäßig Aktualisierungen vom Server erhalten kann kommen verschiedene Methoden in Frage:

1. HTTP Polling
   - Client fragt in bestimmten Intervall neue Daten vom Server an
   - Wäre einfach zu implementieren, sorgt aber für erhöhte Last auf dem Server, da auch Requests gemacht werden wenn keine Änderungen vorliegen.
2. Websockets
   - Änderungen werden direkt vom Server an den Client gesendet
   - Gut bei mehreren parallelen Nutzern
   - Wird von NestJS out-of-the-box unterstützt
3. Server-Sent Events
   - Alternative zu Websockets, einfacher aber unidirektional 

Am sinnvollsten wäre hier vermutlich die Verwendung von Websockets, da diese eine geringe Netzwerklast aufweisen und Änderungen schneller übermittelt werden als beispielsweise beim HTTP Polling. Außerdem werden Websockets von NestJS unterstützt und sie bieten Vorteile gegenüber Server-Sent Events hinsichtlich Flexibilität, Plattform-Kompatibilität und Sicherheit. Jedoch hat man mit der Konfiguration mehr Aufwand und für eine kleine interne Applikation wie diese hier wären auch die beiden anderen Optionen meiner Meinung nach völlig ausreichend.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
