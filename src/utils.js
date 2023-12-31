import * as FileSystem from "expo-file-system";

export const getFileInfo = async (fileURI) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI);
  return fileInfo;
};

export const isLessOrEqualMaxSize = (fileSize, smallerThanSizeMB) => {
  const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
  //console.log(isOk);
  return isOk;
};


export const int8 = new Int8Array(100);