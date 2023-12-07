import pandas as pd
import os

# 스크립트 파일의 디렉토리 경로
script_directory = os.path.dirname(os.path.realpath(__file__))

# 기존 CSV 파일 경로
input_file_path = os.path.join(script_directory, 'battersAll.csv')

# 지정할 여러 열들의 이름
index_columns = ['이름', '타석', 'WAR']

# CSV 파일을 데이터프레임으로 읽기
df = pd.read_csv(input_file_path)

# 지정한 열들을 MultiIndex로 설정
df.set_index(index_columns, inplace=True)

# 새로운 CSV 파일로 저장
output_file_path = os.path.join(script_directory, 'NEWCSV.csv')
df.to_csv(output_file_path)

print(f"새로운 CSV 파일이 {output_file_path}에 저장되었습니다.")
