export interface SDK {
  language: string;
  installCmd: string;
  installPrefix: string;
  version: string;
  repoUrl: string;
  icon: string;
}

export const sdks: SDK[] = [
  {
    language: 'Node.js',
    installCmd: 'whitebooks-sdk',
    installPrefix: 'npm install',
    version: '2.4.1',
    repoUrl: 'https://github.com/whitebooks/whitebooks-node',
    icon: 'node',
  },
  {
    language: 'Python',
    installCmd: 'whitebooks',
    installPrefix: 'pip install',
    version: '2.1.0',
    repoUrl: 'https://github.com/whitebooks/whitebooks-python',
    icon: 'python',
  },
  {
    language: 'Java',
    installCmd: 'com.whitebooks:whitebooks-sdk',
    installPrefix: 'Maven / Gradle',
    version: '2.0.3',
    repoUrl: 'https://github.com/whitebooks/whitebooks-java',
    icon: 'java',
  },
];
