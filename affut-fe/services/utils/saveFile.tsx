export const saveAs = (title : string, text : string, extension : string) => {
  const link = document.createElement('a');
  link.setAttribute('download', `${title}.${extension}`);   
  link.setAttribute('href', 'data:' + 'text/doc' + ';charset=utf-8,' + encodeURIComponent(text));
  link.click(); 
}