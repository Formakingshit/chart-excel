import ExcelJS from 'exceljs'

export class ExcelService {
  private col = 5
  private row = 5
  private fileName = 'result.xlsx'
  constructor(private width: number, private height: number) { }

  public async createExcel(dataUrl: string, timestamps: string[], temperatures: number[]) {
    const workbook = new ExcelJS.Workbook();

    const dataSheet = workbook.addWorksheet("Data");
    const diagramSheet = workbook.addWorksheet("Diagram");

    dataSheet.addTable({
      name: 'MyTable',
      ref: 'A1',
      headerRow: true,
      style: {
        theme: 'TableStyleLight1',
        showRowStripes: true,
      },
      columns: [
        { name: 'Timestamps' },
        { name: 'Temperatures' },
      ],
      rows: timestamps.map((el: string, index: number) => {
        return [el, temperatures[index]]
      })
    });

    const image = workbook.addImage({
      base64: dataUrl,
      extension: 'png',
    });

    diagramSheet.addImage(image, {
      tl: { col: this.col, row: this.row },
      ext: { width: this.width, height: this.height }
    })

    await workbook.xlsx.writeFile(this.fileName);
  }
}
