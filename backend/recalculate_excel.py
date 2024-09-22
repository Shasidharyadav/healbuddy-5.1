import xlwings as xw
import sys

def recalculate_excel(file_path):
    try:
        print(f'Opening workbook: {file_path}')
        
        # Open the workbook using xlwings
        wb = xw.Book(file_path)

        # Check for any named ranges or issues
        print('Workbook opened successfully')

        # Recalculate all formulas
        wb.app.calculate()
        print('Workbook recalculated')

        # Save the workbook
        wb.save()
        print(f'Workbook saved: {file_path}')

        # Close the workbook
        wb.close()
        print('Workbook closed')

    except Exception as e:
        print(f'Error recalculating {file_path}: {str(e)}')

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python recalculate_excel.py <file_path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    recalculate_excel(file_path)
