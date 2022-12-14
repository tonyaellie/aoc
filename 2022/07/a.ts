// deno-lint-ignore-file no-case-declarations
export const x = '';

const input = await Deno.readTextFile('./input.txt');

const commands = input.split('$ ');

// split by line
// first line is command
// following are responses

let currentDir = '/';

type File = {
  type: 'file';
  size: number;
};

type Folder = {
  type: 'folder';
  size?: number;
  files: {
    [key: string]: Folder | File;
  };
};

const files: Folder = {
  type: 'folder',
  files: {},
};

commands.forEach((inp) => {
  // split inp by line
  const [commandWithParams, ...response] = inp
    .split(/\r?\n/)
    .filter((text) => text !== '');
  if (!commandWithParams) return;
  // console.log(commandWithParams);
  const [command, params] = commandWithParams.split(' ');
  switch (command) {
    case 'cd':
      switch (params) {
        case '/':
          currentDir = '/';
          break;
        case '..':
          const split = currentDir.split('/');
          // remove last element
          split.pop();
          split.pop();
          currentDir = `${split.join('/')}/`;
          break;

        default:
          currentDir = `${currentDir}${params}/`;
          break;
      }
      // console.log(currentDir);
      break;

    case 'ls':
      // recursively find the folder
      let currentFolder: Folder = files;
      const split = currentDir.split('/');
      split.shift();
      split.pop();
      split.forEach((folder) => {
        if (!currentFolder.files[folder]) {
          // create folder
          currentFolder.files[folder] = {
            type: 'folder',
            files: {},
          };
        }
        currentFolder = currentFolder.files[folder] as Folder;
      });
      response.forEach((file) => {
        // file in format type/size name
        const [type, name] = file.split(' ');
        if (type === 'dir') {
          currentFolder.files[name] = {
            type: 'folder',
            files: {},
          };
        } else {
          currentFolder.files[name] = {
            type: 'file',
            size: parseInt(type),
          };
        }
      });
      break;

    default:
      console.log('Unknown command', commandWithParams);
      break;
  }
});

// now we go through the files and calculate the size of each folder
const calculateSize = (folder: Folder): number => {
  let size = 0;
  Object.values(folder.files).forEach((file) => {
    if (file.type === 'file') {
      size += file.size;
    } else {
      size += calculateSize(file);
    }
  });
  folder.size = size;
  return size;
};

calculateSize(files);

const printFolder = (folder: Folder, depth: number) => {
  const indent = '  '.repeat(depth);
  Object.entries(folder.files).forEach(([name, file]) => {
    if (file.type === 'file') {
      console.log(`${indent}- ${name} (file, size=${file.size})`);
    } else {
      console.log(`${indent}- ${name} (dir, size=${file.size})`);
      printFolder(file, depth + 1);
    }
  });
};

printFolder(
  {
    type: 'folder',
    files: {
      '/': files,
    },
  },
  0
);

// console.log(JSON.stringify(files, null, 2));

// now we go through the folders and find the folders that are smaller than 100000
const smallFiles: Folder[] = [];
const findSmallFolders = (folder: Folder) => {
  if (folder.size! < 100000) {
    smallFiles.push(folder);
  }
  Object.values(folder.files).forEach((file) => {
    if (file.type === 'folder') {
      findSmallFolders(file);
    }
  });
};

findSmallFolders(files);

// console.log(smallFiles);

// and now we sum the sizes of the files in the small folders
const sum = smallFiles.reduce((acc, folder) => acc + folder.size!, 0);

console.log(sum);
