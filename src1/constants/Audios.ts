import fs from 'react-native-fs';
import RNFetchBlob from 'react-native-blob-util';
import { globalMetrics } from '../../src1/theme';

export interface ListItem {
  fromCurrentUser: boolean;
  path: string;
}

/**
 * File path based on the platform.
 * @type {string}
 */
const filePath: string = globalMetrics.isAndroid
  ? RNFetchBlob.fs.dirs.CacheDir
  : RNFetchBlob.fs.dirs.MainBundleDir;

/**
 * Copy a file to the specified destination path if it doesn't exist.
 * @param {string} value - The name of the file to copy.
 * @param {string} destinationPath - The destination path to copy the file to.
 * @returns {Promise<void>} A Promise that resolves when the file is copied.
 */
const copyFile = async (
  value: string,
  destinationPath: string
): Promise<void> => {
  console.log("The values are",value);
  
  const fileExists = await fs.exists(`${destinationPath}/${value}`);

  if (!fileExists) {
    try {
      const file = await fs.readFileRes(`raw/${value}`, 'base64');
      await fs.writeFile(`${destinationPath}/${value}`, file, 'base64');
    } catch (error) {
      console.log("Error while checking file",error);
    }
  } else {
    // const downloadFile = async (url, filePath) => {
    //   try {
    //     await RNFS.downloadFile({
    //       fromUrl: url,
    //       toFile: filePath,
    //     });
    //   } catch (error) {
    //     console.error('Download error:', error);
    //   }
    // };
  }
};

/**
 * Copy all files in the 'audioAssetArray' to the destination path (Android only).
 * @returns {Promise<void>} A Promise that resolves when all files are copied.
 */
const copyFilesToAndroidResources = async (): Promise<void> => {
  if (globalMetrics.isAndroid) {
    await Promise.all(audioAssetArray.map(value => copyFile(value, filePath)));
  }
};

const audioAssetArray = [
  '2024-08-20-11-50-36-316.m4a',
  'https://firebasestorage.googleapis.com/v0/b/arkenna-e7225.appspot.com/o/chat_media%2F1723098969166?alt=media&token=3a78a84a-44a3-42d7-bac0-54dcb2721f9f',
  'https://firebasestorage.googleapis.com/v0/b/arkenna-e7225.appspot.com/o/chat_media%2F1724148733975?alt=media&token=969b72e2-85dc-433f-9861-f777d5638a37',
  'https://firebasestorage.googleapis.com/v0/b/arkenna-e7225.appspot.com/o/chat_media%2F1724148836159?alt=media&token=62893943-b45b-48f3-a8f1-252d405ed71f',
  // 'file_example_mp3_12s.mp3',
  // 'file_example_mp3_15s.mp3',
];

copyFilesToAndroidResources();

/**
 * List of file objects with information about the files.
 * @type {ListItem[]}
 */

export const audioListArray: ListItem[] = audioAssetArray.map(
  (value, index) => ({
    fromCurrentUser: index % 2 !== 0,
    path:value, //`${fs.DocumentDirectoryPath}/${value}`,
    uri:value,
  })
);