import React, { useContext } from 'react'
import { Button, Empty, Select } from 'antd'

import EditableDatePicker from '@Admin/components/Editable/EditableDatePicker'
import EditableSelect from '@Admin/components/Editable/EditableSelect'
import Confirm from '@Admin/helpers/confirm'

import EditableText from '@Admin/components/Editable/EditableText'
import TaskCreator from '@Admin/components/TaskCreator'
import { skillTitles } from '@Shared/types/Skill'
import ProjectContext from '../context'
import { Body, Section, Title, Wrapper } from './styles'

function EditableDescription() {
  const { currentProject, update, careers, remove } = useContext(ProjectContext)

  if (!currentProject) {
    return (
      <Wrapper>
        <Empty style={{ paddingTop: 200 }} description={<span>선택된 프로젝트가 없습니다.</span>} />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <EditableText
          style={{ flex: 1, marginRight: 7 }}
          name="title"
          type="text"
          initialValue={currentProject.title}
          bold
          size="lg"
          onSave={(name, value) =>
            update({
              ...currentProject,
              [name]: value,
            })
          }
        />
        <Button
          danger
          type="dashed"
          onClick={() =>
            Confirm.delete({
              title: '프로젝트',
              onConfirm() {
                remove(currentProject.id)
              },
            })
          }
        >
          삭제하기
        </Button>
      </div>

      <Body>
        <Section>
          <Title>회사</Title>
          <EditableSelect
            name="where"
            options={careers}
            initialValue={currentProject.where.id}
            onChange={(name, value) =>
              update({
                ...currentProject,
                [name]: careers.find((career) => career.id === value),
              })
            }
          />
        </Section>
        <Section>
          <Title>시작일</Title>
          <EditableDatePicker
            name="startedAt"
            size="sm"
            initialValue={currentProject.startedAt}
            onSave={(name, value) =>
              update({
                ...currentProject,
                [name]: value,
              })
            }
          />
        </Section>

        {currentProject.endedAt && (
          <Section>
            <Title>종료일</Title>

            <EditableDatePicker
              name="endedAt"
              size="sm"
              initialValue={currentProject.endedAt}
              onSave={(name, value) =>
                update({
                  ...currentProject,
                  [name]: value,
                })
              }
            />
          </Section>
        )}

        <Section>
          <Title>설명</Title>
          <EditableText
            name="title"
            type="textarea"
            initialValue={currentProject.description}
            onSave={(name, value) =>
              update({
                ...currentProject,
                [name]: value,
              })
            }
            size="sm"
          />
        </Section>
        <Section>
          <Title>스펙</Title>
          <div style={{ marginLeft: '11px', marginTop: '7px' }}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="프로젝트에 사용된 기술을 선택해주세요."
              onChange={(value) =>
                update({
                  ...currentProject,
                  skills: value,
                })
              }
              defaultValue={currentProject.skills}
              options={skillTitles.map((title) => ({ value: title }))}
            />
          </div>
        </Section>

        <Section>
          <Title>업무</Title>
          <div style={{ marginLeft: '11px', marginTop: '7px' }}>
            <TaskCreator
              items={currentProject.tasks}
              onChange={(value) =>
                update({
                  ...currentProject,
                  tasks: value,
                })
              }
            />
          </div>
        </Section>
      </Body>
    </Wrapper>
  )
}

export default EditableDescription
