export const createFileReader = (
  onSuccess: (content: object) => void,
  onError: () => void,
) => {
  const fileReader = new FileReader();

  fileReader.onload = e => {
    if (!e.target?.result) { return; }
    let fileContent: string;
    if (e.target.result instanceof ArrayBuffer) {
      const decoder = new TextDecoder();
      fileContent = decoder.decode(e.target.result);
    } else {
      fileContent = e.target.result;
    }
    try {
      const parsedContent = JSON.parse(fileContent);
      onSuccess(parsedContent);
    } catch {
      onError();
    }
  };

  return fileReader;
};