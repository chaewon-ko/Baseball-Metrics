import pandas as pd

def merge_multiple_files(files, output_path):
    """
    여러 개의 CSV 파일을 차례대로 병합하고, 중복된 행을 첫 번째 값만 유지한 후 결과를 저장하는 함수.

    Parameters:
    - files (list): 병합할 CSV 파일 경로 리스트
    - output_path (str): 결과를 저장할 CSV 파일 경로
    """
    if not files or len(files) < 2:
        raise ValueError("적어도 두 개 이상의 CSV 파일이 필요합니다.")

    merged_df = pd.read_csv(files[0])

    for file in files[1:]:
        df = pd.read_csv(file)
        merged_df = pd.merge(merged_df, df, on='이름', suffixes=('', '_drop'), how='outer')

    merged_df = merged_df.fillna('')

    grouped_df = merged_df.groupby('이름').first().reset_index()

    grouped_df = grouped_df.loc[:, ~grouped_df.columns.str.endswith('_drop')]

    grouped_df.to_csv(output_path, index=False)

file_paths = ['pitchersBasic.csv', 'pitchersCheck.csv', 'pitchersERA.csv',
              'pitchersExp.csv', 'pitchersHit1.csv', 'pitchersHit2.csv',
              'pitchersPA.csv', 'pitchersPitchType.csv', 'pitchersPitchValue.csv',
              'pitchersRelief.csv', 'pitchersRisk.csv', 'pitchersStarting.csv',
              'pitchersValue.csv', 'pitchersWP.csv']

output_path = 'pitchersAll.csv'

merge_multiple_files(file_paths, output_path)
