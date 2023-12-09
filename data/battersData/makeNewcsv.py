import pandas as pd
import os

script_directory = os.path.dirname(os.path.realpath(__file__))

input_file_path = os.path.join(script_directory, 'battersAll.csv')

df = pd.read_csv(input_file_path)

# 조건: '타석'이 100 이상인 경우
condition = df['타석'] > 25

# 조건을 만족하는 선수들로 이루어진 새로운 데이터프레임 생성
selected_batters_df = df[condition]

# 새로운 CSV 파일로 저장
output_file_path = os.path.join(script_directory, 'battersGame.csv')
selected_batters_df.to_csv(output_file_path, index=False)

print(f"선택된 선수들의 CSV 파일이 {output_file_path}에 저장되었습니다.")
