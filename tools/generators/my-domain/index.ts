import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import { MyDomainOptions } from './schema';

export default async function (host: Tree, schema: MyDomainOptions) {

  // Plugins for Nx

  // Viele Hilfsfunktionen in @nrwl/devkit
  // Templates kopieren
  // Projekt-Config lesen

  host.write("hello.txt", "Manfred was here!");

  // Andere Generatoren: Funktionen
  await libraryGenerator(host, { name: "domain-" + schema.domainName });
  host.write(`libs/domain-${schema.domainName}/src/lib/hello.txt`, "Manfred was here!");
}
