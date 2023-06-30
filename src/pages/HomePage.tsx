import { useAppDispatch, useAppSelector } from '@/hooks'
import { useEffect } from 'react'
import {
  fetchProviders,
  selectProvider,
  selectReal,
  showMore,
} from '@/store/reducers/games'
import { Button, Col, Divider, Image, Row, Select, Typography } from 'antd'
import { RealType } from '@/models/game'
import { Link } from 'react-router-dom'

export function HomePage() {
  const dispatch = useAppDispatch()
  const { games, filters, providers, reals } = useAppSelector(
    (state) => state.games,
  )

  const handleProviderSelect = (provider: string) =>
    dispatch(selectProvider(provider))
  const handleRealSelect = (real: RealType) => dispatch(selectReal(real))
  const handleShowMore = () => dispatch(showMore())

  useEffect(() => {
    dispatch(fetchProviders())
  }, [])

  const style = { width: '100%' }

  const providersOptions = providers.map((provider) => ({
    label: provider,
    value: provider,
  }))
  const realsOptions = reals.map((real) => ({ label: real, value: real }))

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={3}>
          <Select
            style={style}
            options={realsOptions}
            onChange={handleRealSelect}
            placeholder={'Валюта'}
            value={filters.real}
          />
        </Col>
        <Col xs={3}>
          <Select
            style={style}
            options={providersOptions}
            onChange={handleProviderSelect}
            placeholder={'Провайдер'}
            value={filters.provider}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[32, 32]}>
        {games.slice(0, filters.count).map((game) => (
          <Col key={game.id} xs={24} lg={4}>
            <Link to={'/details/' + game.id}>
              <Image
                src={`https://cdn2.softswiss.net/i/s2/${game.id}.png`}
                preview={false}
              />
              <Typography.Paragraph>{game.title}</Typography.Paragraph>
            </Link>
          </Col>
        ))}
        <Col xs={24}>
          <Row justify={'center'}>
            <Button
              type={'primary'}
              onClick={handleShowMore}
              disabled={filters.count >= games.length}
            >
              Показать еще
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
